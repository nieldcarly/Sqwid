using System;
using System.Collections.Generic;

#nullable disable

namespace Sqwid
{
    public partial class Rating
    {
        public int? RatingNumber { get; set; }
        public int RatingUserId { get; set; }
        public int RatingCreationId { get; set; }

        public virtual Creation RatingCreation { get; set; }
        public virtual User RatingUser { get; set; }
    }
}
