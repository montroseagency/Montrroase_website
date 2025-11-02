import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    title: "E-Commerce Redesign",
    category: "Website Creation",
    image: "/modern-ecommerce-website.png",
    result: "250% increase in conversions",
  },
  {
    title: "Social Campaign",
    category: "Social Media Marketing",
    image: "/social-media-marketing-campaign-graphics.jpg",
    result: "2M+ impressions in 30 days",
  },
  {
    title: "Brand Launch",
    category: "Brand Identity",
    image: "/modern-brand-identity.png",
    result: "Featured in industry publications",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">Real results for real businesses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="border-border overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="text-sm text-accent font-medium mb-2">{project.category}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground">{project.result}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
