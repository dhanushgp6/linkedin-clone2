# linkedin_backend/csrf_exempt.py
from rest_framework.authentication import SessionAuthentication

class CsrfExemptSessionAuthentication(SessionAuthentication):
    """
    Same as DRF’s SessionAuthentication but skips the CSRF check.
    Safe because we still need a valid sessionid cookie, and these
    views are API-only (no form POST from browsers).
    """
    def enforce_csrf(self, request):
        return  # simply skip the csrf check
