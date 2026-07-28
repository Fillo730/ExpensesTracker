using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace DotnetApi.Controllers;

public class BaseController : ControllerBase
{
    protected int GetUserIdFromToken()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if(int.TryParse(claim, out int userId))
        {
            return userId;
        }

        return 0;
    }
}