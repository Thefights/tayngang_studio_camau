using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Implements.Base;
using BusinessLogicLayer.StateMachines;
using DataAccessLayer.Enums;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IOrderManagementService : ICrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>
    {
        Task UpdateStatusAsync(int id, OrderStatusEnum status);
    }

    public class OrderManagementService(IUnitOfWork _unitOfWork, IMapper _mapper) : CrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>(_unitOfWork, _mapper, ["OrderDetails.Product"]), IOrderManagementService
    {
        public async Task UpdateStatusAsync(int id, OrderStatusEnum status)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(id) ?? throw new NotFoundException("Order not found");

            var stateMachine = new OrderStateMachine(order.Status);

            var trigger = status switch
            {
                OrderStatusEnum.Canceled => OrderStateMachine.Trigger.Cancel,
                OrderStatusEnum.Completed => OrderStateMachine.Trigger.Complete,
                _ => throw new ValidationException("Invalid status transition")
            };

            stateMachine.Fire(trigger);

            order.Status = stateMachine.State;

            _unitOfWork.Repository<Order>().Update(order);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}