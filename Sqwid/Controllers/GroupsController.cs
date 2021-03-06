using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Sqwid.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Sqwid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqwidDBContext _context;

        public GroupsController(IConfiguration configuration, SqwidDBContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        // GET: api/<GroupsController>
        [HttpGet]
        public ActionResult<List<Group>> GetAllGroups()
        {
            List<Group> groups = _context.Groups.ToList();
            return Ok(groups);
        }

        // GET api/<GroupsController>/5
        [HttpGet("{id}")]
        public ActionResult<Group> GetSingleGroup(int id)
        {
            Group group = _context.Groups.Where(g => g.GroupId == id).FirstOrDefault();
            return Ok(group);
        }

        [HttpGet("users/{id}")]
        public ActionResult<List<User>> GetUsersForGroup(int id)
        {
            List<User> usersInGroup = _context.UserGroups.Where(x => x.UserGroupGroupId == id).Select(x => x.UserGroupUser).ToList();
            return Ok(usersInGroup);
        }

        [HttpPost("adduser/{gid}/{uid}")]
        public ActionResult AddUserToGroup(int gid, int uid)
        {
            UserGroup userGroup = new UserGroup();
            userGroup.UserGroupGroupId = gid;
            userGroup.UserGroupUserId = uid;
            if (!_context.UserGroups.Where(x => x.UserGroupGroupId == gid).Where(y => y.UserGroupUserId == uid).Any())
            {
                _context.UserGroups.Add(userGroup);
                _context.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("addusers/{gid}")]
        public ActionResult AddUsersToGroup([FromRoute]int gid, [FromBody] string username)
        {
            UserGroup userGroup = new UserGroup();
            userGroup.UserGroupGroupId = gid;
            userGroup.UserGroupUserId = _context.Users.Where(x => x.UserUserName == username).FirstOrDefault().UserId;
            _context.UserGroups.Add(userGroup);
            _context.SaveChanges();

            return Ok();
        }

        // POST api/<GroupsController>
        [HttpPost]
        public ActionResult<Group> Post(Group incomingGroup)
        {
            Group newGroup = new Group();
            if (ModelState.IsValid)
            {
                newGroup.GroupAdminId = incomingGroup.GroupAdminId;
                newGroup.GroupDescription = incomingGroup.GroupDescription;
                newGroup.GroupName = incomingGroup.GroupName;

                _context.Add(newGroup);
                _context.SaveChanges();

                AddUserToGroup(newGroup.GroupId, newGroup.GroupAdminId ?? 0);

                return Ok(newGroup);
            }

            return BadRequest();
        }

        // DELETE api/<GroupsController>/5
        [HttpDelete("leavegroup/{gid}/{uid}")]
        public void Delete(int gid, int uid)
        {
            var userGroup = _context.UserGroups.Where(x => x.UserGroupGroupId == gid).Where(y => y.UserGroupUserId == uid).FirstOrDefault();
            _context.UserGroups.Remove(userGroup);
            _context.SaveChanges();
        }
    }
}
