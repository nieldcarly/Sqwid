﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Sqwid.Model
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            Creations = new HashSet<Creation>();
            Events = new HashSet<Event>();
            Groups = new HashSet<Group>();
        }

        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserEmail { get; set; }
        [Key]
        public int UserId { get; set; }
        public string UserUserName { get; set; }
        public string UserPassword { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Creation> Creations { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<Group> Groups { get; set; }
    }
}
