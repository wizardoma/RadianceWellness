import Link from "next/link";
import { ArrowRight, Star, Clock, Filter } from "lucide-react";
import { Button, Badge } from "@radiance/ui";
import { services, serviceCategories } from "@radiance/mock-data";
import { formatCurrency, formatDuration } from "@radiance/utils";

const serviceImages: Record<string, string> = {
  "swedish-massage": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800",
  "deep-tissue-massage": "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800",
  "hammam-experience": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
  "sauna-session": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800",
  "couples-massage": "https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=800",
  "signature-facial": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800",
  "hot-stone-massage": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800",
  "aromatherapy-massage": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
  "steam-bath": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
  "manicure-pedicure": "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800",
  "hair-styling": "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800",
  "gym-access": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
  "aerobics-class": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
};

export const metadata = {
  title: "Services",
  description: "Explore our comprehensive range of wellness services including massage therapy, thermal bathing, beauty treatments, and fitness.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-primary-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Discover our comprehensive range of wellness services designed to 
            nurture your body, calm your mind, and elevate your spirit.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="px-6 py-2.5 rounded-full bg-primary-500 text-white text-sm font-medium"
            >
              All Services
            </Link>
            {serviceCategories.map((category) => (
              <Link
                key={category.id}
                href={`/services/${category.slug}`}
                className="px-6 py-2.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500">
              Showing <span className="font-semibold text-gray-900">{services.length}</span> services
            </p>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const minPrice = Math.min(...Object.values(service.price));
              const imageUrl = serviceImages[service.id] || serviceImages["swedish-massage"];

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.category}/${service.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-soft-sm hover:shadow-soft-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {service.isPopular && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="accent">Popular</Badge>
                      </div>
                    )}
                    {service.isNew && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="success">New</Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <span className="text-xs text-primary-600 font-medium uppercase tracking-wider">
                      {service.category.replace("-", " & ")}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-xl font-semibold text-gray-900 mt-2 mb-2 group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {service.shortDescription}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        {/* Rating */}
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-accent-400 fill-current mr-1" />
                          <span className="font-medium">{service.rating}</span>
                          <span className="text-gray-400 ml-1">({service.reviewCount})</span>
                        </div>
                        {/* Duration */}
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDuration(service.duration[0])}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs text-gray-400">From</span>
                        <div className="font-semibold text-primary-600">
                          {formatCurrency(minPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Can't decide? Let us help!
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our wellness consultants can recommend the perfect treatment based on your needs.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Get a Recommendation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
