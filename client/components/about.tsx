export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
              Dedicated to Growth, Culture & Results
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Montrose Agency is a creative hub where brands and businesses come to define who they are, sharpen their
                vision, and carve out what's next.
              </p>
              <p>
                We help brands find their voice through strategic social media marketing and compelling web design. And
                we help businesses grow with data-driven campaigns that deliver measurable results.
              </p>
              <p>
                That's why we created our unique approach—a new way to collaborate, innovate, and ensure the best ideas
                don't just happen, they thrive.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img src="/about-og-image.png" alt="Team collaboration" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
