using DotnetApi.Dtos;
using DotnetApi.IMappers;
using DotnetApi.IRepositories;
using DotnetApi.IServices;
using DotnetApi.Mappers;

namespace DotnetApi.Services;

public class AuthService(IUserRepository usersRepository, ITokenService tokenService,
        IAuthMapper authMapper) : IAuthService
{
    private readonly IUserRepository _userRepository = usersRepository;

    private readonly ITokenService _tokenService = tokenService;

    private readonly IAuthMapper _authMapper = authMapper;

    public async Task<LoginResponseDto?> LoginUserAsync(LoginRequestDto loginRequestDto)
    {
        var User = await _userRepository.GetUserByUsernameAsync(loginRequestDto.Username);

        if(User is null)
        {
            return null;
        }

        var isPasswordCorrect = BCrypt.Net.BCrypt.Verify(loginRequestDto.Password, User.PasswordHash);

        if(!isPasswordCorrect)
        {
            return null;
        }

        (string token, DateTime expiresDate) = _tokenService.GenerateToken(User);

        var result = _authMapper.MapUserToLoginResponseDto(User, token, expiresDate);

        return result;
    }

    public async Task<LoginResponseDto?> RegisterUserAsync(RegisterRequestDto registerRequestDto)
    {
        var userByUsername = await _userRepository.GetUserByUsernameAsync(registerRequestDto.Username);

        var userByEmail = await _userRepository.GetUserByEmailAsync(registerRequestDto.Email);

        if(userByUsername != null || userByEmail != null)
        {
            return null;
        } 

        var newUser = _authMapper.MapRegisterRequestDtoToUser(registerRequestDto);

        newUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerRequestDto.Password);

        await _userRepository.CreateUserAsync(newUser);

        await _userRepository.SaveChangesAsync();

        (string token, DateTime expiresDate) = _tokenService.GenerateToken(newUser);

        var result = _authMapper.MapUserToLoginResponseDto(newUser, token, expiresDate);

        return result;

    }
}