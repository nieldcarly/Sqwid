using System;
using System.Collections.Generic;

#nullable disable

namespace Sqwid.Model
{
    public partial class Event
    {
        public Event()
        {
            Creations = new HashSet<Creation>();
        }

        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public int EventId { get; set; }
        public int EventGroupId { get; set; }
        public int? EventAdmin { get; set; }
        public DateTime? EventStartDate { get; set; }
        public DateTime? EventDueDate { get; set; }
        public bool? EventPublicVoting { get; set; }
        public string EventCategory { get; set; }

        public virtual User EventAdminNavigation { get; set; }
        public virtual Group EventGroup { get; set; }
        public virtual ICollection<Creation> Creations { get; set; }
    }
}
