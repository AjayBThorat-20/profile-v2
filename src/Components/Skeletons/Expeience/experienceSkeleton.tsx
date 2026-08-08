export default function ExperienceSkeleton() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className={`relative bg-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 border-2 border-border ${
              idx === 0 ? "md:col-start-1 md:row-start-1" :
              idx === 1 ? "md:col-start-2 md:row-start-1" :
              idx === 2 ? "md:col-start-1 md:row-start-2 lg:col-start-3 lg:row-start-1" : ""
            }`}
          >
            {/* Placeholder for image */}
            <div className="relative h-64 w-full overflow-hidden bg-muted animate-pulse"></div>

            {/* Placeholder for text content */}
            <div className="p-6">
              <div className="h-6 bg-muted rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-2/3 mb-2 animate-pulse"></div>

              {/* Placeholder for button */}
              <div className="h-10 bg-muted rounded-lg mt-4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
  );
}