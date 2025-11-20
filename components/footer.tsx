export default function Footer() {
  return (
    <footer className="py-10 mt-10 border-t text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} YvesDC — All rights reserved.</p>

      <p className="mt-2">
        <a
          href="/PRIVACY_POLICY.md"
          target="_blank"
          className="underline hover:text-primary"
        >
          Privacy Policy
        </a>
            <a
          href="/TERMS_AND_CONDITIONS.md"
          target="_blank"
          className="underline hover:text-primary"
        >
          Terms & conditions
        </a>
      </p>
      
    </footer>
  );
}
