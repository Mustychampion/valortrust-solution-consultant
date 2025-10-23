-- Add status column to user_roles for approval workflow
ALTER TABLE public.user_roles ADD COLUMN status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Add timestamp for when role was requested
ALTER TABLE public.user_roles ADD COLUMN requested_at timestamp with time zone NOT NULL DEFAULT now();

-- Add timestamp for when role was approved/rejected
ALTER TABLE public.user_roles ADD COLUMN reviewed_at timestamp with time zone;

-- Add column to track who approved/rejected
ALTER TABLE public.user_roles ADD COLUMN reviewed_by uuid REFERENCES auth.users(id);

-- Update existing has_role function to only check approved roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
      AND role = _role
      AND status = 'approved'
  )
$$;

-- Create RLS policy for admins to manage role approvals
CREATE POLICY "Admins can manage all role requests"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Allow users to insert their own role requests
CREATE POLICY "Users can request roles"
ON public.user_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Allow users to view their own role requests
CREATE POLICY "Users can view own role requests"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);