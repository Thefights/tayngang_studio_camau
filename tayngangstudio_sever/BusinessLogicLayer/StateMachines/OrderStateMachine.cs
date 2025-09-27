using DataAccessLayer.Enums;
using Stateless;

namespace BusinessLogicLayer.StateMachines
{
    public class OrderStateMachine
    {
        private readonly StateMachine<OrderStatusEnum, Trigger> _machine;

        public enum Trigger
        {
            Cancel,
            Complete
        }

        public OrderStateMachine(OrderStatusEnum initialState)
        {
            _machine = new StateMachine<OrderStatusEnum, Trigger>(initialState);

            _machine.Configure(OrderStatusEnum.Pending)
                .Permit(Trigger.Cancel, OrderStatusEnum.Canceled)
                .Permit(Trigger.Complete, OrderStatusEnum.Completed);

            _machine.Configure(OrderStatusEnum.Completed)
                .Ignore(Trigger.Complete);

            _machine.Configure(OrderStatusEnum.Canceled)
                .Ignore(Trigger.Cancel);
        }

        public void Fire(Trigger trigger)
        {
            _machine.Fire(trigger);
        }

        public OrderStatusEnum State => _machine.State;
    }
}
