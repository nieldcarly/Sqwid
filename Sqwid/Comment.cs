using System;
using System.Collections.Generic;

#nullable disable

namespace Sqwid
{
    public partial class Comment
    {
        public string CommentText { get; set; }
        public int CommentId { get; set; }
        public int CommentCreationId { get; set; }
        public int CommentUserId { get; set; }

        public virtual Creation CommentCreation { get; set; }
        public virtual User CommentUser { get; set; }
    }
}
