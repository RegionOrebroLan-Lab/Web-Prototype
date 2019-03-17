using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace Prototype
{
	public class Startup
	{
		#region Methods

		public void Configure(IApplicationBuilder applicationBuilder, IHostingEnvironment hostingEnvironment)
		{
			if(hostingEnvironment.IsDevelopment())
				applicationBuilder.UseDeveloperExceptionPage();

			applicationBuilder.UseDefaultFiles();
			applicationBuilder.UseStaticFiles();
		}

		#endregion
	}
}