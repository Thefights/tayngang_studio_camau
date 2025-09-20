using BusinessLogicLayer.DTO.Abstract.Base;

namespace BusinessLogicLayer.DTO
{
    public class ProductCategoryCreateDTO : BaseDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
    public class ProductCategoryUpdateDTO : BaseDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
    public class ProductCategoryGetDTO : BaseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}