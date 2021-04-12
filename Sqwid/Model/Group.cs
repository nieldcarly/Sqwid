using System;
using System.Collections.Generic;

#nullable disable

namespace Sqwid.Model
{
    public partial class Group
    {
        public Group()
        {
            Creations = new HashSet<Creation>();
            Events = new HashSet<Event>();
            UserGroups = new HashSet<UserGroup>();
        }

        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string GroupDescription { get; set; }
        public int? GroupAdminId { get; set; }

        public virtual User GroupAdmin { get; set; }
        public virtual ICollection<Creation> Creations { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<UserGroup> UserGroups { get; set; }
    }
}
