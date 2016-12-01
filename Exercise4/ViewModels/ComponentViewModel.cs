using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Exercise4.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Exercise4.ViewModels
{
    public class ComponentViewModel
    {
        [Required]
        public long ComponentTypeId { get; set; }

        public IEnumerable<SelectListItem> ComponentTypes { get; set; }

        [Required]
        public int ComponentNumber { get; set; }

        [Required]
        public string SerialNo { get; set; }

        [Required]
        public ComponentStatus Status { get; set; }

        public string AdminComment { get; set; }

        public string UserComment { get; set; }

        public long? CurrentLoanInformationId { get; set; }
    }
}