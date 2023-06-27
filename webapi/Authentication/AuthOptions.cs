using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace webapi.Authentication
{
    public static class AuthOptions
    {
        public const string Issuer = "BookClubApi";
        public const string Audience = "BookClubClient";
        private const string _key = "BooCk_Club17!BooCk_Club17!BooCk_Club17!!";

        public static SymmetricSecurityKey GetSecurityKey() => new(Encoding.UTF8.GetBytes(_key));
    }
}
