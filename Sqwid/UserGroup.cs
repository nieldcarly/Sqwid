using System;
using System.Collections.Generic;

#nullable disable

namespace Sqwid
{
    public partial class UserGroup
    {
        public int UserGroupGroupId { get; set; }
        public int UserGroupUserId { get; set; }

        public virtual Group UserGroupGroup { get; set; }
        public virtual User UserGroupUser { get; set; }
    }
}
