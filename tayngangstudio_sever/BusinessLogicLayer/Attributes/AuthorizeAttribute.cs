using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BusinessLogicLayer.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public string? Roles { get; set; }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // Fix: Check for AllowAnonymousAttribute in the filter pipeline instead of EndpointMetadata
            var allowAnonymous = context.Filters.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous) return;

            var user = context.HttpContext.User;

            if (user?.Identity == null || !user.Identity.IsAuthenticated)
            {
                context.Result = new JsonResult(new { message = "Unauthorized" })
                { StatusCode = StatusCodes.Status401Unauthorized };
                return;
            }

            if (!string.IsNullOrEmpty(Roles) && !user.IsInRole(Roles))
            {
                context.Result = new JsonResult(new { message = "Forbidden" })
                { StatusCode = StatusCodes.Status403Forbidden };
                return;
            }
        }
    }
}