export default function Footer() {
  return (
    <footer className="border-t bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          &copy; 2024 Office Meal. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Terms
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
