import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* WhatsApp Float Button */}
      <a 
        href="https://wa.me/2348039535043" 
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </a>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-primary text-white pt-32 pb-40 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Empowering Brands and Building Dreams with Innovative Solutions
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Your trusted partner in digital transformation and construction excellence in Kano, Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-secondary hover:bg-yellow-600 text-primary font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 text-center">
                Start Your Project Today
              </a>
              <a href="#services" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 text-center">
                Our Services
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-blue-800 rounded-full opacity-20 absolute -left-10 -top-10 animate-pulse"></div>
              <div className="w-80 h-80 md:w-96 md:h-96 bg-secondary rounded-full opacity-20 absolute -right-10 -bottom-10 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1780&q=80" 
                alt="Business Team" 
                className="relative z-10 rounded-2xl shadow-2xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-gray-500 mb-8 font-medium">TRUSTED BY BRANDS ACROSS NIGERIA</h3>
          <div className="flex overflow-hidden">
            <div className="flex space-x-16 px-4 animate-marquee items-center">
              {[...Array(8)].map((_, i) => (
                <img 
                  key={i}
                  src={`https://tailwindui.com/img/logos/158x48/${['transistor', 'reform', 'tuple', 'savvycal', 'statamic'][i % 5]}-logo-gray-900.svg`}
                  alt="Partner Logo" 
                  className="h-12 opacity-60 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About ValorTrust</h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Team Meeting" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-primary mb-6">Our Story</h3>
              <p className="text-gray-600 mb-6">
                Founded in Kano, Nigeria, ValorTrust Solution and Consultant has been at the forefront of delivering innovative solutions that bridge the gap between digital transformation and construction excellence.
              </p>
              
              <h3 className="text-2xl font-bold text-primary mb-6 mt-10">Meet the Founder</h3>
              <p className="text-gray-600 mb-6">
                "A dedicated strategist and visionary from Zangon Bare Bari Quarter, Kano. I specialize in digital marketing, social media growth, branding, quantity surveying, real estate management, and construction project consulting. I'm studying Quantity Surveying at Bayero University Kano and help businesses scale through smart, creative systems."
              </p>
              <p className="font-medium">— Mustapha Sani Jibril</p>
            </div>
          </div>
          
          {/* Core Values */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-primary mb-10 text-center">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "shield-alt", title: "Integrity", desc: "We uphold the highest standards of honesty and ethical practices in all our interactions." },
                { icon: "lightbulb", title: "Innovation", desc: "We constantly seek creative solutions to meet our clients' evolving needs with cutting-edge approaches." },
                { icon: "star", title: "Excellence", desc: "We commit to delivering superior quality in every project, setting benchmarks in our industry." },
                { icon: "handshake", title: "Partnership", desc: "We believe in collaborative relationships that foster mutual growth and long-term success." }
              ].map((value, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center border-t-4 border-primary">
                  <div className="text-primary text-4xl mb-4">
                    <i className={`fas fa-${value.icon}`}></i>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive solutions tailored to your business needs</p>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "hashtag", title: "Social Media Management", desc: "Grow your online presence with strategic content and engagement that converts followers to customers." },
              { icon: "palette", title: "Business Branding", desc: "Create a powerful brand identity that resonates with your target audience and stands out in the market." },
              { icon: "chess", title: "Product Strategy", desc: "Develop winning product strategies for kitchenware, retail, and consumer goods that drive sales." },
              { icon: "cube", title: "3D Object Design", desc: "Bring your product ideas to life with stunning 3D designs for tea flasks, warmers, and more." },
              { icon: "chart-line", title: "Small Business Consulting", desc: "Scale your business with expert guidance on operations, marketing, and growth strategies." },
              { icon: "bullhorn", title: "Marketing Campaigns", desc: "Launch data-driven marketing campaigns that generate leads and boost your revenue." },
              { icon: "building", title: "Building Construction", desc: "Professional construction services from planning to execution with quality craftsmanship." },
              { icon: "home", title: "Real Estate Management", desc: "Maximize your property investments with our comprehensive management solutions." },
              { icon: "calculator", title: "Quantity Surveying", desc: "Accurate cost estimation and project budgeting to keep your construction projects on track." }
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-500 hover:shadow-xl">
                <div className="h-48 bg-primary flex items-center justify-center">
                  <i className={`fas fa-${service.icon} text-white text-6xl`}></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <a href="#contact" className="text-secondary font-medium hover:text-yellow-600 transition">Learn More →</a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a href="#contact" className="bg-primary hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 inline-block">
              Get a Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <Link to="/portfolio" className="block">
        <section id="portfolio" className="py-20 bg-white hover:bg-gray-50 transition cursor-pointer">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">View Our Portfolio</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">See our work in action across different industries</p>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
              <p className="text-secondary font-medium mt-6">Click to explore →</p>
            </div>
          </div>
        </section>
      </Link>

      {/* Testimonials */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">Hear from businesses we've helped transform</p>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Aisha Abdullahi", role: "CEO, Nana's Kitchen", image: "women/43", quote: "ValorTrust transformed our social media presence completely. In just 3 months, we saw a 400% increase in engagement and a significant boost in sales." },
              { name: "Mohammed Kabir", role: "Manager, Kabir Properties", image: "men/32", quote: "Their quantity surveying services saved us over 15% on our construction costs while maintaining quality. Highly recommended for any building project." },
              { name: "Fatima Yusuf", role: "Director, Home Essentials", image: "women/65", quote: "The 3D product designs created for our kitchenware line helped us secure major retail contracts. Their creative vision is exceptional." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white text-gray-800 rounded-xl shadow-lg p-8 transition duration-500 hover:bg-blue-800 hover:text-white">
                <div className="flex items-center mb-4">
                  <div className="text-secondary text-2xl mr-2">
                    {[...Array(5)].map((_, j) => <i key={j} className="fas fa-star"></i>)}
                  </div>
                </div>
                <p className="mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img src={`https://randomuser.me/api/portraits/${testimonial.image}.jpg`} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/Insights Section */}
      <Link to="/insights" className="block">
        <section id="blog" className="py-20 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest Insights</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">Discover trends, tips and strategies for business growth</p>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
              <p className="text-secondary font-medium mt-6">View all articles →</p>
            </div>
          </div>
        </section>
      </Link>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-secondary opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-secondary opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
                Whether you need digital solutions or construction expertise, we're here to help your business reach new heights.
              </p>
              <a href="#contact" className="bg-secondary hover:bg-yellow-600 text-primary font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 inline-block mr-4 mb-4 md:mb-0">
                Schedule Consultation
              </a>
              <a href="tel:+2348039535043" className="bg-transparent border-2 border-white hover:bg-white hover:text-primary font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 inline-block">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Link to="/contact">
        <section id="contact" className="py-20 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">We'd love to hear about your project and discuss how we can help</p>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
              <p className="text-secondary font-medium mt-6">Contact us →</p>
            </div>
          </div>
        </section>
      </Link>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            Subscribe to our newsletter for business tips, industry insights, and exclusive offers.
          </p>
          
          <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-4 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition text-gray-800"
            />
            <button type="submit" className="bg-secondary hover:bg-yellow-600 text-primary font-bold py-4 px-8 rounded-lg transition transform hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
      
      {/* Made By Credit */}
      <div className="fixed left-2 bottom-2 z-10 bg-black/80 text-white text-xs rounded-lg px-3 py-2">
        Made By: <a href="https://wa.me/2349095569295" className="underline hover:text-secondary transition" target="_blank" rel="noopener noreferrer">MUSTY-JIKANJAJI</a>
      </div>
    </div>
  );
};

export default Home;
