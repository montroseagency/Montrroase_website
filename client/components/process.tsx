const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and competitive landscape",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Develop a comprehensive roadmap tailored to your unique needs and objectives",
  },
  {
    number: "03",
    title: "Creation",
    description: "Bring your vision to life with stunning design and compelling content",
  },
  {
    number: "04",
    title: "Launch & Optimize",
    description: "Deploy your campaign and continuously refine based on real-time data",
  },
]

export function Process() {
  return (
    <section id="process" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Our Process
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            A proven methodology for delivering exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-bold text-accent/20 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
