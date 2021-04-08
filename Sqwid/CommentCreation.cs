using System;
using System.Collections.Generic;

#nullable disable

namespace Sqwid
{
    public partial class CommentCreation
    {
        public int CommentCreationsCommentId { get; set; }
        public int CommentCreationsCreationId { get; set; }

        public virtual Comment CommentCreationsComment { get; set; }
        public virtual Creation CommentCreationsCreation { get; set; }
    }
}
