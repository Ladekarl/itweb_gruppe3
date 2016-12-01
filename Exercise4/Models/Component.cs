namespace Exercise4.Models
{
    public class Component
    {
        public long ComponentId { get; set; }
        public long ComponentTypeId { get; set; }
        public ComponentType ComponentType { get; set; }
        public int ComponentNumber { get; set; }
        public string SerialNo { get; set; }
        public ComponentStatus Status { get; set; }
        public string AdminComment { get; set; }
        public string UserComment { get; set; }
        public long? CurrentLoanInformationId { get; set; }
    }
}