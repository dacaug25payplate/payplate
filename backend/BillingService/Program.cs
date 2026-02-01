using Microsoft.EntityFrameworkCore;
using BillingService.Models;
using BillingService.Services;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 Enable CORS (for React frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy
                .AllowAnyOrigin()
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
app.UseCors("AllowReact");

app.UseAuthorization();

// 🔹 Enable Controllers
app.MapControllers();

app.Run();
