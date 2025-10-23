import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { z } from "zod";

const emailAuthSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  fullName: z.string().max(100).optional(),
  role: z.enum(["admin", "customer"]).optional(),
});

const phoneAuthSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (use E.164 format)"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  fullName: z.string().max(100).optional(),
  role: z.enum(["admin", "customer"]).optional(),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "customer">("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(isAdmin ? "/admin" : "/");
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authMethod === "email") {
        const validation = emailAuthSchema.safeParse({
          email: email.trim(),
          password,
          fullName: fullName.trim(),
          role: selectedRole,
        });

        if (!validation.success) {
          toast.error(validation.error.errors[0].message);
          setLoading(false);
          return;
        }

        if (isLogin) {
          const { error } = await supabase.auth.signInWithPassword({
            email: validation.data.email,
            password: validation.data.password,
          });

          if (error) {
            if (error.message.includes("Invalid login credentials")) {
              toast.error("Invalid email or password");
            } else {
              toast.error(error.message);
            }
          } else {
            toast.success("Welcome back!");
            navigate("/");
          }
        } else {
          const { data, error } = await supabase.auth.signUp({
            email: validation.data.email,
            password: validation.data.password,
            options: {
              data: {
                full_name: validation.data.fullName || "",
              },
              emailRedirectTo: `${window.location.origin}/`,
            },
          });

          if (error) {
            if (error.message.includes("already registered")) {
              toast.error("This email is already registered. Please sign in instead.");
            } else {
              toast.error(error.message);
            }
          } else if (data.user) {
            // Insert role request
            const { error: roleError } = await supabase.from("user_roles").insert({
              user_id: data.user.id,
              role: validation.data.role || "customer",
              status: "pending",
            });

            if (roleError) {
              console.error("Role request error:", roleError);
            }

            toast.success("Account created! Your role request is pending approval.");
            navigate("/");
          }
        }
      } else {
        // Phone authentication
        const validation = phoneAuthSchema.safeParse({
          phone: phone.trim(),
          password,
          fullName: fullName.trim(),
          role: selectedRole,
        });

        if (!validation.success) {
          toast.error(validation.error.errors[0].message);
          setLoading(false);
          return;
        }

        if (isLogin) {
          const { error } = await supabase.auth.signInWithPassword({
            phone: validation.data.phone,
            password: validation.data.password,
          });

          if (error) {
            toast.error(error.message);
          } else {
            toast.success("Welcome back!");
            navigate("/");
          }
        } else {
          const { data, error } = await supabase.auth.signUp({
            phone: validation.data.phone,
            password: validation.data.password,
            options: {
              data: {
                full_name: validation.data.fullName || "",
              },
            },
          });

          if (error) {
            toast.error(error.message);
          } else if (data.user) {
            // Insert role request
            const { error: roleError } = await supabase.from("user_roles").insert({
              user_id: data.user.id,
              role: validation.data.role || "customer",
              status: "pending",
            });

            if (roleError) {
              console.error("Role request error:", roleError);
            }

            toast.success("Account created! Your role request is pending approval.");
            navigate("/");
          }
        }
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to sign in"
              : "Enter your information to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as "email" | "phone")} className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Request Role</Label>
                      <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as "admin" | "customer")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Your role will need admin approval</p>
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="phone">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullNamePhone">Full Name</Label>
                      <Input
                        id="fullNamePhone"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rolePhone">Request Role</Label>
                      <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as "admin" | "customer")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Your role will need admin approval</p>
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Use E.164 format (e.g., +1234567890)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordPhone">Password</Label>
                  <Input
                    id="passwordPhone"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
