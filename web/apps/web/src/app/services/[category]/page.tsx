import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Clock } from "lucide-react";
import { Button, Badge } from "@radiance/ui";
import { services, serviceCategories, getCategoryBySlug, getServicesByCategory } from "@radiance/mock-data";
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

const categoryImages: Record<string, string> = {
  "thermal-bathing": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070",
  "massage-therapy": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070",
  "beauty-grooming": "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070",
  "fitness": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
};

export function generateStaticParams() {
  return serviceCategories.map((category) => ({
    category: category.slug,
  }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) return { title: "Category Not Found" };
  
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }

  const categoryServices = getServicesByCategory(category.id);
  const heroImage = categoryImages[category.id] || categoryImages["massage-therapy"];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-primary-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-primary-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Services
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500">
              <span className="font-semibold text-gray-900">{categoryServices.length}</span> services available
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryServices.map((service) => {
              const minPrice = Math.min(...Object.values(service.price));
              const imageUrl = serviceImages[service.id] || serviceImages["swedish-massage"];

              return (
                <Link
                  key={service.id}
                  href={`/services/${params.category}/${service.slug}`}
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
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {service.shortDescription}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-accent-400 fill-current mr-1" />
                          <span className="font-medium">{service.rating}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDuration(service.duration[0])}
                        </div>
                      </div>
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

          {categoryServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No services found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
