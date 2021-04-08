﻿using Microsoft.AspNetCore.Http;
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

        // idk if this one works
        [HttpGet("groups/{id}")]
        public ActionResult<List<Group>> GetGroupsForUser(int id)
        {
            List<Group> groups = _context.UserGroups.Where(x => x.UserGroupUserId == id).Select(x => x.UserGroupGroup).ToList();
            return Ok(groups);
        }

        [HttpGet("login")]
        public ActionResult<User> GetUserByLogin(string username, string password)
        {
            User myUser = _context.Users.Where(x => x.UserUserName == username && x.UserPassword == password).FirstOrDefault();
            if (myUser != null)
            {
                HttpContext.Session.SetString("username", username);
                return Ok(myUser);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUserById(int id)
        {
            User myUser = _context.Users.Where(x => x.UserId == id).FirstOrDefault();
            return Ok(myUser);
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
