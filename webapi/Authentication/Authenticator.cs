using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using webapi.DTO;
using webapi.SQL;

namespace webapi.Authentication
{
    public class Authenticator
    {
        private readonly IRepository _repository;
        public Authenticator(IRepository repository)
        {
            _repository = repository;
        }
        public AuthenticationResult Authenticate(string login, string password)
        {
            var user = _repository.GetUser(login);
            if (user == null)
            {
                user = new() { UserName = login, Password = password };
                _repository.InsertNewUser(user);
                return new() { AccessToken = GenerateJwtToken(user.UserName), UserName = user.UserName };
            }
            else if (user != null && user.Password == password)
                return new() { AccessToken = GenerateJwtToken(user.UserName), UserName = user.UserName };
            else throw new NullReferenceException();
        }
        private static string GenerateJwtToken(string login)
        {
            var claims = new List<Claim> { new(ClaimTypes.Name, login) };
            var jwt = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: new(AuthOptions.GetSecurityKey(), SecurityAlgorithms.HmacSha256)
                );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
