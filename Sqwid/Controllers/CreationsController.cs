using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Sqwid.Model;
using System;
using System.Collections.Generic;
using System.IO;
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
        private readonly IWebHostEnvironment _env;

        public CreationsController(IConfiguration configuration, SqwidDBContext context, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
            _context = context;

        }

        [HttpGet]
        public ActionResult<List<Creation>> GetCreations()
        {
            List<Creation> creations = _context.Creations.ToList();
            return Ok(creations);
        }

        [HttpGet("{id}")]
        public ActionResult<Creation> GetCreation(int id)
        {
            Creation creation = _context.Creations.Where(x => x.CreationId == id).FirstOrDefault();
            return Ok(creation);
        }

        [HttpGet("group/{id}")]
        public ActionResult<List<Creation>> GetCreationsForGroup(int id)
        {
            List<Creation> creations = _context.Creations.Where(x => x.CreationGroupId == id).ToList();
            return Ok(creations);
        }

        [HttpGet("event/{id}")]
        public ActionResult<List<Creation>> GetCreationsForEvent(int id)
        {
            List<Creation> creations = _context.Creations.Where(x => x.CreationEventId == id).ToList();
            return Ok(creations);
        }

        [HttpGet("user/{id}")]
        public ActionResult<List<Creation>> GetCreationsForUser(int id)
        {
            List<Creation> creations = _context.Creations.Where(x => x.CreationCreatorId == id).ToList();
            return Ok(creations);
        }

        [HttpPost]
        public ActionResult<Creation> CreateCreation(Creation incomingData)
        {
            if (ModelState.IsValid)
            {
                Creation newCreation = new Creation();
                newCreation.CreationEventId = incomingData.CreationEventId;
                newCreation.CreationCreatorId = incomingData.CreationCreatorId;
                newCreation.CreationCreatorFirstName = _context.Users.Where(x => x.UserId == incomingData.CreationCreatorId).FirstOrDefault().UserFirstName;
                newCreation.CreationCreatorFirstName = _context.Users.Where(x => x.UserId == incomingData.CreationCreatorId).FirstOrDefault().UserLastName;
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

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }

        [HttpDelete]
        public IActionResult DeleteCreation(int id)
        {
            Creation creation = _context.Creations.Where(x => x.CreationId == id).FirstOrDefault();
            _context.Creations.Remove(creation);
            _context.SaveChanges();
            return Ok();
        }

    }
}
