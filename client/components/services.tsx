import { Card, CardContent } from "@/components/ui/card"
import { Megaphone, Globe, TrendingUp, Palette } from "lucide-react"

const services = [
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description: "Strategic campaigns that engage your audience and build lasting brand loyalty across all platforms",
  },
  {
    icon: Globe,
    title: "Website Creation",
    description: "Custom-designed, high-performance websites that convert visitors into customers",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Data-driven approaches to scale your business and maximize ROI",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Cohesive visual identities that make your brand unforgettable",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Comprehensive digital solutions tailored to your business goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg group"
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
