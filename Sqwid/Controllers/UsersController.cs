using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Sqwid.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sqwid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqwidDBContext _context;

        public UsersController(IConfiguration configuration, SqwidDBContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            List<User> users = _context.Users.ToList();
            return Ok(users);
        }

        [HttpPost]
        public ActionResult<User> CreateUser(User incomingData)
        {
            if (ModelState.IsValid)
            {
                User newUser = new User();
                newUser.UserEmail = incomingData.UserEmail;
                newUser.UserFirstName = incomingData.UserFirstName;
                newUser.UserLastName = incomingData.UserLastName;
                newUser.UserPassword = incomingData.UserPassword;
                _context.Users.Add(newUser);
                _context.SaveChanges();
                return Ok(newUser);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
