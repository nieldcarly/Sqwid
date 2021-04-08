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

        // POST api/<GroupsController>
        [HttpPost]
        public ActionResult<Group> Post(Group incomingGroup)
        {
            Session["UserName"] = UserNameTextBox.Text;
        }

        // PUT api/<GroupsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<GroupsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
