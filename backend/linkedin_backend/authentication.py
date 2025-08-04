from rest_framework.authentication import SessionAuthentication

class CsrfExemptSessionAuthentication(SessionAuthentication):
    """Session auth that skips the CSRF check (dev-only)."""
    def enforce_csrf(self, request):
        return    # disable CSRF validation
