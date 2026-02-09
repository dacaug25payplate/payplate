<<<<<<< HEAD
using BillingService.Models;
using BillingService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 Enable CORS (for React frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


// 🔹 Register DbContext
builder.Services.AddDbContext<BillingDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("BillingDb"),
        new MySqlServerVersion(new Version(9, 5, 0))
    )
);

// 🔹 Register Services
builder.Services.AddScoped<DiscountService>();
builder.Services.AddScoped<BillingServiceLogic>();
builder.Services.AddScoped<FeedbackService>();

var app = builder.Build();

// 🔹 Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 🔹 IMPORTANT: Use CORS BEFORE authorization
app.UseCors("AllowFrontend");

app.UseAuthorization();

// 🔹 Enable Controllers
app.MapControllers();

app.Run();
=======
using BillingService.Models;
using BillingService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 Enable CORS (for React frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


// 🔹 Register DbContext
builder.Services.AddDbContext<BillingDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("BillingDb"),
        new MySqlServerVersion(new Version(9, 5, 0))
    )
);

// 🔹 Register Services
builder.Services.AddScoped<DiscountService>();
builder.Services.AddScoped<BillingServiceLogic>();
builder.Services.AddScoped<FeedbackService>();

var app = builder.Build();

// 🔹 Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 🔹 IMPORTANT: Use CORS BEFORE authorization
app.UseCors("AllowFrontend");

app.UseAuthorization();

// 🔹 Enable Controllers
app.MapControllers();

app.Run();
>>>>>>> c87ec4f75a8e93d7327b2ae6d3782028ab930100
