"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
} from "lucide-react";
import { Button, Badge } from "@radiance/ui";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type GalleryCategory =
  | "All"
  | "Facilities"
  | "Treatments"
  | "Accommodations"
  | "Events";

interface GalleryImage {
  id: number;
  category: GalleryCategory;
  caption: string;
  gradient: string;
  aspect: "square" | "tall" | "wide";
}

const categories: GalleryCategory[] = [
  "All",
  "Facilities",
  "Treatments",
  "Accommodations",
  "Events",
];

const galleryImages: GalleryImage[] = [
  // Facilities
  {
    id: 1,
    category: "Facilities",
    caption: "Reception & Welcome Lounge",
    gradient: "from-emerald-500 to-teal-600",
    aspect: "wide",
  },
  {
    id: 2,
    category: "Facilities",
    caption: "Infinity Pool & Terrace",
    gradient: "from-cyan-500 to-blue-600",
    aspect: "tall",
  },
  {
    id: 3,
    category: "Facilities",
    caption: "Finnish Sauna Room",
    gradient: "from-amber-500 to-orange-600",
    aspect: "square",
  },
  {
    id: 4,
    category: "Facilities",
    caption: "Fitness Center & Gym",
    gradient: "from-slate-500 to-gray-700",
    aspect: "square",
  },
  // Treatments
  {
    id: 5,
    category: "Treatments",
    caption: "Massage Treatment Suite",
    gradient: "from-purple-500 to-violet-600",
    aspect: "tall",
  },
  {
    id: 6,
    category: "Treatments",
    caption: "Signature Facial Experience",
    gradient: "from-pink-400 to-rose-500",
    aspect: "square",
  },
  {
    id: 7,
    category: "Treatments",
    caption: "Traditional Hammam",
    gradient: "from-indigo-500 to-blue-700",
    aspect: "wide",
  },
  // Accommodations
  {
    id: 8,
    category: "Accommodations",
    caption: "Premium Suite Living Room",
    gradient: "from-amber-400 to-yellow-600",
    aspect: "wide",
  },
  {
    id: 9,
    category: "Accommodations",
    caption: "Luxury Bedroom Suite",
    gradient: "from-rose-400 to-pink-600",
    aspect: "square",
  },
  {
    id: 10,
    category: "Accommodations",
    caption: "Spa-Inspired Bathroom",
    gradient: "from-teal-400 to-emerald-600",
    aspect: "tall",
  },
  // Events
  {
    id: 11,
    category: "Events",
    caption: "Group Yoga Session",
    gradient: "from-lime-500 to-green-600",
    aspect: "square",
  },
  {
    id: 12,
    category: "Events",
    caption: "Wellness Retreat Weekend",
    gradient: "from-fuchsia-500 to-purple-700",
    aspect: "wide",
  },
];

/* ------------------------------------------------------------------ */
/*  Lightbox Component                                                 */
/* ------------------------------------------------------------------ */

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[currentIndex];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Image Container */}
      <motion.div
        key={image.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl mx-4 aspect-[16/10] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-full h-full bg-gradient-to-br ${image.gradient} flex items-center justify-center`}
        >
          <div className="text-center text-white">
            <Camera className="h-16 w-16 mx-auto mb-4 opacity-40" />
            <p className="text-2xl font-medium opacity-60">{image.caption}</p>
          </div>
        </div>

        {/* Caption Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="bg-white/20 text-white mb-2">
                {image.category}
              </Badge>
              <p className="text-white text-lg font-medium">{image.caption}</p>
            </div>
            <span className="text-white/60 text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredImages.length - 1 : prev - 1;
    });
  }, [filteredImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  }, [filteredImages.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070')",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="bg-accent-400 text-accent-950 mb-4">
              Our Gallery
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Explore{" "}
              <span className="text-accent-400">Radiance</span>
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
              Take a visual journey through our world-class facilities,
              treatments, luxury accommodations, and memorable wellness events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-8 bg-white border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`cursor-pointer group ${
                    image.aspect === "tall"
                      ? "sm:row-span-2"
                      : image.aspect === "wide"
                        ? "sm:col-span-2 lg:col-span-1"
                        : ""
                  }`}
                  onClick={() => openLightbox(index)}
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden ${
                      image.aspect === "tall"
                        ? "aspect-[3/4] sm:h-full"
                        : image.aspect === "wide"
                          ? "aspect-[16/9]"
                          : "aspect-square"
                    }`}
                  >
                    {/* Gradient Placeholder */}
                    <div
                      className={`w-full h-full bg-gradient-to-br ${image.gradient} transition-transform duration-500 group-hover:scale-105`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="h-10 w-10 text-white/30" />
                      </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">
                        {image.category}
                      </Badge>
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-medium text-sm">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-foreground-muted">
                No images in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Experience It Yourself
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Pictures tell a story, but nothing compares to the real thing.
              Book your visit and discover the Radiance experience firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-primary-50"
                asChild
              >
                <Link href="/book">
                  Book Your Visit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
