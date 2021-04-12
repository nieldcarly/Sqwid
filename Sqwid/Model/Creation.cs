using System;
using System.Collections.Generic;

#nullable disable

namespace Sqwid.Model
{
    public partial class Creation
    {
        public Creation()
        {
            Comments = new HashSet<Comment>();
        }

        public string CreationImagePath { get; set; }
        public string CreationDescription { get; set; }
        public string CreationTitle { get; set; }
        public int? CreationCreatorId { get; set; }
        public int CreationId { get; set; }
        public int? CreationNumFavorites { get; set; }
        public bool? CreationIsPublic { get; set; }
        public int? CreationRating { get; set; }
        public int? CreationEventId { get; set; }
        public int? CreationGroupId { get; set; }
        public string CreationCreatorFirstName { get; set; }
        public string CreationCreatorLastName { get; set; }

        public virtual User CreationCreator { get; set; }
        public virtual Event CreationEvent { get; set; }
        public virtual Group CreationGroup { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
