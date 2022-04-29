using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
       
        private readonly DataContext _context;
        public BookController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> Get()
        {
            return Ok(await _context.Books.ToListAsync());
        }

        [HttpGet("{isbn}")]
        public async Task<ActionResult<List<Book>>> GetByISBN(int isbn)
        {
            var book = await _context.Books.FindAsync(isbn);
            if (book == null)
                return BadRequest("Book not found!");
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult<List<Book>>> AddBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return Ok(await _context.Books.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Book>>> UpdateBook(Book request)
        {
            var dbBook = await _context.Books.FindAsync(request.ISBN);
            if (dbBook == null)
                return BadRequest("Book not found!");

            dbBook.ISBN = request.ISBN;
            dbBook.BookName = request.BookName;
            dbBook.AuthorName = request.AuthorName;
            dbBook.BookDescription = request.BookDescription;
            dbBook.Category = request.Category;
            dbBook.Amount = request.Amount;
            dbBook.Price = request.Price;

            await _context.SaveChangesAsync();

            return Ok(await _context.Books.ToListAsync());
        }

        [HttpDelete("{isbn}")]
        public async Task<ActionResult<List<Book>>> DeleteBook(int isbn)
        {
            var dbBook = await _context.Books.FindAsync(isbn);
            if (dbBook == null)
                return BadRequest("Book not found!");

            _context.Books.Remove(dbBook);
            await _context.SaveChangesAsync();
            return Ok(await _context.Books.ToListAsync());
        }
    }
}
