import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Clock, Check, ChevronRight, Users } from "lucide-react";
import { Button, Badge, Card, CardContent } from "@radiance/ui";
import { 
  services, 
  getServiceBySlug, 
  getCategoryBySlug, 
  getAddOnsByIds,
  getStaffByService,
  getPopularServices 
} from "@radiance/mock-data";
import { formatCurrency, formatDuration, slugToTitle } from "@radiance/utils";

const serviceImages: Record<string, string[]> = {
  "swedish-massage": [
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1200",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800",
  ],
  "deep-tissue-massage": [
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800",
  ],
  "hammam-experience": [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
  ],
  "sauna-session": [
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200",
  ],
  "couples-massage": [
    "https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=1200",
  ],
  "signature-facial": [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200",
  ],
};

export function generateStaticParams() {
  return services.map((service) => ({
    category: service.category,
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: { params: { category: string; slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({ 
  params 
}: { 
  params: { category: string; slug: string } 
}) {
  const service = getServiceBySlug(params.slug);
  const category = getCategoryBySlug(params.category);
  
  if (!service || !category) {
    notFound();
  }

  const addOns = getAddOnsByIds(service.addOns);
  const staff = getStaffByService(service.id);
  const relatedServices = getPopularServices()
    .filter(s => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

  const images = serviceImages[service.id] || [serviceImages["swedish-massage"][0]];
  const minPrice = Math.min(...Object.values(service.price));

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/services" className="text-gray-500 hover:text-primary-600">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link 
              href={`/services/${params.category}`} 
              className="text-gray-500 hover:text-primary-600"
            >
              {category.name}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4">
                <img
                  src={images[0]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {images.slice(1, 4).map((img, index) => (
                    <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden">
                      <img
                        src={img}
                        alt={`${service.name} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Meta */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <Badge variant="secondary">{category.name}</Badge>
                {service.isPopular && <Badge variant="accent">Popular</Badge>}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {service.name}
              </h1>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-accent-400 fill-current mr-1" />
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-gray-500 ml-1">({service.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-5 w-5 mr-1" />
                  {service.duration.map(d => formatDuration(d)).join(" / ")}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
                About This Service
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  Benefits
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What to Expect */}
            {service.whatToExpect && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  What to Expect
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {service.whatToExpect}
                </p>
              </div>
            )}

            {/* Preparation */}
            {service.preparation && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  How to Prepare
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {service.preparation}
                </p>
              </div>
            )}

            {/* Staff */}
            {staff.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  Our Specialists
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {staff.slice(0, 4).map((member) => (
                    <div key={member.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                        <span className="text-primary-700 font-semibold">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-soft-lg">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <span className="text-sm text-gray-500">Starting from</span>
                    <div className="flex items-baseline">
                      <span className="font-display text-3xl font-bold text-primary-600">
                        {formatCurrency(minPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Duration Options */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Duration
                    </label>
                    <div className="space-y-2">
                      {service.duration.map((duration) => (
                        <label
                          key={duration}
                          className="flex items-center justify-between p-4 border border-border rounded-xl cursor-pointer hover:border-primary-300 transition-colors"
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="duration"
                              value={duration}
                              defaultChecked={duration === service.duration[0]}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-3 text-gray-900">{formatDuration(duration)}</span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(service.price[duration])}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  {addOns.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Enhance Your Experience
                      </label>
                      <div className="space-y-2">
                        {addOns.map((addon) => (
                          <label
                            key={addon.id}
                            className="flex items-center justify-between p-3 border border-border rounded-xl cursor-pointer hover:border-primary-300 transition-colors"
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
                              />
                              <div className="ml-3">
                                <span className="text-sm text-gray-900">{addon.name}</span>
                                {addon.duration && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    +{addon.duration} min
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              +{formatCurrency(addon.price)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button size="lg" className="w-full" asChild>
                    <Link href={`/book?service=${service.id}`}>
                      Book Now
                    </Link>
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Free cancellation up to 24 hours before
                  </p>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="mt-6">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Our team is here to help you choose the right treatment.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://wa.me/2348001234567">Chat with us</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((related) => {
                const relatedMinPrice = Math.min(...Object.values(related.price));
                const relatedImage = serviceImages[related.id]?.[0] || serviceImages["swedish-massage"][0];

                return (
                  <Link
                    key={related.id}
                    href={`/services/${related.category}/${related.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-soft-sm hover:shadow-soft-lg transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={relatedImage}
                        alt={related.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                        {related.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {related.shortDescription}
                      </p>
                      <p className="text-primary-600 font-semibold mt-2">
                        From {formatCurrency(relatedMinPrice)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
