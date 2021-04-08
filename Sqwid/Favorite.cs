using System;
using System.Collections.Generic;

#nullable disable

namespace Sqwid
{
    public partial class Favorite
    {
        public int FavoriteCreationId { get; set; }
        public int FavoriteUserId { get; set; }

        public virtual Creation FavoriteCreation { get; set; }
        public virtual User FavoriteUser { get; set; }
    }
}
