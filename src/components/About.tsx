const About = () => {

  return (
    <section id="about" className="hidden md:block py-12 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Mobile: single-line stats */}
        <div className="md:hidden text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">15+ Years</span> · <span className="font-semibold">1000+ Customers</span> · <span className="font-semibold">24/7 Emergency</span>
          </p>
        </div>

        {/* Desktop: existing blue card */}
        <div className="hidden md:block">
          <div className="bg-[#4492AC] backdrop-blur-sm rounded-2xl p-8 shadow-elegant">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-blue-50">Years of Experience</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-blue-50">Happy Customers</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-50">Emergency Service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
