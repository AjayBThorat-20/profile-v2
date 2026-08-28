export default function ContactSkeleton() {
    return (
      <div className="w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl p-8 mx-auto animate-pulse">
        <div className="h-6 w-32 bg-muted rounded mb-4 mx-auto"></div>
        <div className="h-4 w-64 bg-muted rounded mb-6 mx-auto"></div>

        <div className="space-y-6">
          <div>
            <div className="h-4 w-24 bg-muted rounded mb-2"></div>
            <div className="h-10 w-full bg-muted rounded"></div>
          </div>

          <div>
            <div className="h-4 w-24 bg-muted rounded mb-2"></div>
            <div className="h-10 w-full bg-muted rounded"></div>
          </div>

          <div>
            <div className="h-4 w-24 bg-muted rounded mb-2"></div>
            <div className="h-10 w-full bg-muted rounded"></div>
          </div>

          <div>
            <div className="h-4 w-24 bg-muted rounded mb-2"></div>
            <div className="h-24 w-full bg-muted rounded"></div>
          </div>

          <div className="h-12 w-full bg-primary/40 rounded"></div>
        </div>
      </div>
    );
  }
  