using AutoMapper;
using BusinessLogicLayer.DTO.UserDTO.AuthenticateDTO;
using BusinessLogicLayer.DTO.UserDTO.LoginDTO;
using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Utils;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IAuthService
    {
        public Task<User> RegisterAsync(AuthUserRequestDTO dto);
        public Task<AuthUserRespondDTO> LoginAsync(LoginDTO dto);
        public Task ForgotPasswordAsync(string email);
    }

    public class AuthService(IUnitOfWork _unitOfWork, JwtUtils _jwtUtils, IMapper _mapper, IEmailService _emailService) : IAuthService
    {
        public async Task<User> RegisterAsync(AuthUserRequestDTO dto)
        {
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

        public async Task<AuthUserRespondDTO> LoginAsync(LoginDTO dto)
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

            _unitOfWork.Repository<User>().Update(user);
            await _unitOfWork.SaveChangesAsync();

            return new AuthUserRespondDTO(user, jwtToken);
        }

        public async Task ForgotPasswordAsync(string email)
        {
            var user = await GetUserByEmailAsync(email);
            if (user == null)
            {
                throw new AppException("User not found.");
            }

            var newPassword = StringUtil.GenerateSecurePassword(12);
            user.Password = CryptoUtil.EncryptPassword(newPassword);

            _unitOfWork.Repository<User>().Update(user);
            await _unitOfWork.SaveChangesAsync();

            await _emailService.SendEmailAsync(email, "Password Recovery", $"Your new password is: {newPassword}");
        }


        private async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Email == email);

            return user;
        }

        private async Task<User?> GetUserByPhone(string phone)
        {
            var user = await _unitOfWork.Repository<User>().GetByCondition(u => u.Phone == phone);
            return user;
        }
    }
}