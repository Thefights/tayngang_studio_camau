using AutoMapper;
using BusinessLogicLayer.DTO.UserDTO.AuthenticateDTO;
using BusinessLogicLayer.DTO.UserDTO.LoginDTO;
using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Utils;
using DataAccessLayer.Models.UserEntities;
using DataAccessLayer.Repository.Base;
using Microsoft.Extensions.Options;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IAuthService
    {
        public Task<User> RegisterAsync(AuthUserRequestDTO dto);
        public Task<AuthUserRespondDTO> AuthenticateAsync(LoginDTO dto);
        public Task<AuthUserRespondDTO> RefreshTokenAsync(string refreshToken);
    }

    public class AuthService(IUnitOfWork _unitOfWork, JwtUtils _jwtUtils, IMapper _mapper, IOptions<AppSettings> _appSettings) : IAuthService
    {
        public async Task<User> RegisterAsync(AuthUserRequestDTO dto)
        {
            // Check if user already exists
            var existEmail = await GetUserByEmailAsync(dto.Email);
            var existPhone = await GetUserByPhone(dto.Phone);

            if (existEmail != null)
            {
                throw new AppException("Email already exists.");
            }
            else if (existPhone != null)
            {
                throw new AppException("Phone number already exists.");
            }

            var entity = _mapper.Map<User>(dto);

            entity.Password = CryptoUtil.EncryptPassword(dto.Password);

            await _unitOfWork.Repository<User>().CreateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return entity;
        }

        public async Task<AuthUserRespondDTO> AuthenticateAsync(LoginDTO dto)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Email == dto.Email);

            if (user == null)
            {
                throw new UnauthorizedAccessException("Email is incorrect.");
            }
            else if (!CryptoUtil.IsPasswordCorrect(dto.Password, user.Password))
            {
                throw new UnauthorizedAccessException("Password is incorrect.");
            }

            var jwtToken = _jwtUtils.GenerateJwtToken(user);
            var refreshToken = _jwtUtils.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(30);

            _unitOfWork.Repository<User>().Update(user);
            await _unitOfWork.SaveChangesAsync();

            return new AuthUserRespondDTO(user, jwtToken, refreshToken);
        }

        public async Task<AuthUserRespondDTO> RefreshTokenAsync(string refreshToken)
        {
            var isValidRefreshToken = await IsRefreshTokenValid(refreshToken);

            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.RefreshToken == refreshToken);

            if (!isValidRefreshToken)
                throw new AppException("Invalid refresh token.");

            var jwtToken = _jwtUtils.GenerateJwtToken(user);

            return new AuthUserRespondDTO(user, jwtToken, refreshToken);
        }

        private async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Email == email);

            return user;
        }

        private async Task<User> GetUserByPhone(string phone)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Phone == phone);
            return user;
        }

        private async Task<bool> IsRefreshTokenValid(string refreshToken)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.RefreshToken == refreshToken);

            if (user != null && user.RefreshTokenExpiryTime >= DateTime.UtcNow) return true;

            return false;
        }
    }
}