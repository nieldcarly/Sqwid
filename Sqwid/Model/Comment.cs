﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Sqwid.Model
{
    public partial class Comment
    {
        public string CommentText { get; set; }
        [Key]
        public int CommentId { get; set; }
        public int CommentCreationId { get; set; }
        public int CommentUserId { get; set; }

        public virtual Creation CommentCreation { get; set; }
        public virtual User CommentUser { get; set; }
    }
}
