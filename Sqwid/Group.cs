using System;
using System.Collections.Generic;

#nullable disable

namespace Sqwid
{
    public partial class Group
    {
        public Group()
        {
            Events = new HashSet<Event>();
        }

        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string GroupDescription { get; set; }
        public int? GroupAdminId { get; set; }

        public virtual User GroupAdmin { get; set; }
        public virtual ICollection<Event> Events { get; set; }
    }
}
