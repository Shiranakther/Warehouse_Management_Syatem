import Item from '../models/Item.model.js';


//adding items through the api
export const AddItems = async (req,res,next) => {
    const{ItemID,ItemType,ItemNoOfUints,curruntlevel,ItemDiscription,supplierName}=req.body; 
    const newItem = new Item({
        ItemID,
        ItemType,
        ItemNoOfUints,
        ItemDiscription,
        curruntlevel,
        supplierName
    });
    try {
        await newItem.save();
        res.status(201).json({massage:"Item added successfully"});
    } catch (error) {
        next(error);
    }
    
};

//rendering all the items from the api
export const GetItems = async (req,res,next) => {
    try{
        const allItems = await Item.find({});
        res.status(200).json(allItems);     
    }
    catch(error){
        next(error);
    };
    
};

export const GetsingItems = async (req,res,next) => {
    try{
        const ItemID = req.params.ItemID;
        const oneItem = await Item.findOne({ItemID});
        res.status(200).json(oneItem);     
    }
    catch(error){
        next(error);
    };
    
};

// deleting an item from the api
export const DeleteItems = async(req,res,next) => {
    try{
        const ItemID = req.params.id;
        const item = await Item.findOneAndDelete(ItemID);
        if(!item){
            return res.status(404).json({massage:"Item not found"});
        }
        res.status(200).json({massage:"Item deleted successfully"});

    }
    catch(error){
        next(error);
    }
};

// export const DeleteItems = async (req, res, next) => {
//     try {
//         const itemId = req.params.id;
        
//         // Find the item by ID and delete it
//         const item = await Item.findByIdAndDelete(itemId);

//         // Check if item exists
//         if (!item) {
//             return res.status(404).json({ message: "Item not found" });
//         }

//         // If deletion is successful, send success response
//         res.status(200).json({ message: "Item deleted successfully" });
//     } catch (error) {
//         next(error);
//     }
// };


//updating the items from the api
export const UpdateItems = async(req,res,next) => {
    const {ItemID} = req.params; //getting the item id from the params
    const {ItemDiscription,ItemType,ItemNoOfUints,curruntlevel,supplierName} = req.body; //getting the item data from the body
    try {
        //finding the item by id and updating the item data
        const UpdateItems = await Item.findOneAndUpdate({ItemID},
            {ItemDiscription,ItemType,ItemNoOfUints,curruntlevel},
            {new:true});
            //if the item is not found return a 404 status
            if(!UpdateItems){
                return res.status(404).json({massage:"Item not found!"});
            }
            //if the item is found return the updated item data to the frontend
            res.status(200).json(UpdateItems);
            
        
    } catch (error) {
        res.status(500).json(error);
        
    }
};

export const GetItemreport = async(req,res,next) => {
    try{
        const doc = new JSpdf();
         // Add header border
        doc.setDrawColor(0); // Set border color to black
        doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, 40); // Draw header border with increased height

        // Add header content
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 255); // Set color to blue
        doc.text('Chaminda Stores', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // Reset color to black
        doc.setFontSize(10);
        doc.setTextColor(130,130,130); // Set color to blue
        doc.text('No 125, Mapatana, Horana', doc.internal.pageSize.getWidth() / 2, 27, { align: 'center' });
        doc.setFontSize(10);
        doc.text('TP : 075 - 6175658', doc.internal.pageSize.getWidth() / 2, 34, { align: 'center' });
        doc.setFontSize(16);
        // Calculate space needed for date and time text
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
        const formattedTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'UTC' });
        const dateTimeText = 'Date: ' + formattedDate + ' Time: ' + formattedTime;
        const textWidth = doc.getStringUnitWidth(dateTimeText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const availableWidth = doc.internal.pageSize.getWidth() - 20; // Subtracting 20 to provide padding
        const xPos = 104;
        const yPos = 40; // Adjust as needed

        // Add current date and time
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // Set color to black
        doc.text(dateTimeText, xPos, yPos, { align: 'center' }); // Adjust the position as needed

        // Add document border
        doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10); // Draw document border

        // Add title with underline
        doc.setFontSize(16);
        doc.setDrawColor(0); // Set140,140 underline color to black
        res.setHeader('Content-Type','application/pdf');
        res.setHeader('Content-Disposition','attachment; filename=Itemreport.pdf');
        doc.fontSize(25).text('Item Report',100,100);
        const allItems = await Item.find({});
        res.status(200).json(allItems);   
        doc.pipe(res);
        

        allItems.forEach((item,index) => {
            doc.fontSize(14).text(`${item.ItemID}:${item.ItemDiscription}`,100,150 + (index*25));
        });
        doc.end();

    }
    catch(error){
        next(error);
    };
};