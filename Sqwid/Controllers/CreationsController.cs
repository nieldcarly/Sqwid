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
    public class CreationsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqwidDBContext _context;

        public CreationsController(IConfiguration configuration, SqwidDBContext context)
        {
            _configuration = configuration;
            _context = context;

        }

        [HttpGet]
        public ActionResult<List<Creation>> GetCreations()
        {
            List<Creation> creations = _context.Creations.ToList();
            return Ok(creations);
        }

        [HttpGet("{id}")]
        public ActionResult<List<Creation>> GetCreations(int id)
        {
            Creation creations = _context.Creations.Where(x => x.CreationId == id).FirstOrDefault();
            return Ok(creations);
        }

        //[HttpGet("group/{id}")]
        //public ActionResult<List<Creation>> GetCreationsForGroup(int id)
        //{
        // TO DO
        //}

        [HttpPost]
        public ActionResult<Creation> CreateCreation(Creation incomingData)
        {
            if (ModelState.IsValid)
            {
                Creation newCreation = new Creation();
                var name = HttpContext.Session.GetString("username");
                newCreation.CreationCreatorId = _context.Users.Where(x => x.UserUserName == name).FirstOrDefault().UserId;
                newCreation.CreationDescription = incomingData.CreationDescription;
                newCreation.CreationImagePath = incomingData.CreationImagePath;
                newCreation.CreationIsPublic = incomingData.CreationIsPublic;
                newCreation.CreationNumFavorites = 0;
                newCreation.CreationTitle = incomingData.CreationTitle;
                newCreation.CreationRating = 0;

                _context.Add(newCreation);
                _context.SaveChanges();
                return Ok(newCreation);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
