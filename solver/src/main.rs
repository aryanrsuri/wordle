

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let resp = reqwest::get("https://httpbin.org/get")
        .await?;
    println!("{:#?}", resp);
    Ok(())
}