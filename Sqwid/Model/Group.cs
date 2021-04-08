﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Sqwid.Model
{
    public partial class Group
    {
        public Group()
        {
            Events = new HashSet<Event>();
        }
        [Key]
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string GroupDescription { get; set; }
        public int? GroupAdminId { get; set; }

        public virtual User GroupAdmin { get; set; }
        public virtual ICollection<Event> Events { get; set; }
    }
}
