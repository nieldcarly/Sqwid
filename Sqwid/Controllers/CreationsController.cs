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
                //var name = HttpContext.Session.GetString("username");
                newCreation.CreationCreatorId = incomingData.CreationCreatorId;
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

    }
}
